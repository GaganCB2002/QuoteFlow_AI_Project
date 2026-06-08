package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Role;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthControllerTest {

    @LocalServerPort
    private int port;

    private RestTemplate restTemplate;

    private String baseUrl;

    private static RestTemplate createRestTemplate() {
        RestTemplate rt = new RestTemplate();
        rt.setErrorHandler(new org.springframework.web.client.ResponseErrorHandler() {
            @Override
            public boolean hasError(org.springframework.http.client.ClientHttpResponse response) {
                return false;
            }
            @Override
            public void handleError(URI url, org.springframework.http.HttpMethod method, org.springframework.http.client.ClientHttpResponse response) {
            }
        });
        return rt;
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        restTemplate = createRestTemplate();
        baseUrl = "http://localhost:" + port + "/api/auth";
        userRepository.deleteAll();
        User testUser = User.builder()
                .name("John Doe")
                .email("john@example.com")
                .phone("1234567890")
                .passwordHash(passwordEncoder.encode("Test@1234"))
                .role(Role.ROLE_SALES_EXECUTIVE)
                .build();
        userRepository.save(testUser);
    }

    @Test
    void testValidLogin_TC_AUTH_001() {
        Map<String, String> loginBody = Map.of("phone", "1234567890", "password", "Test@1234");
        ResponseEntity<Map> response = restTemplate.postForEntity(baseUrl + "/login", loginBody, Map.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().get("token"));
    }

    @Test
    void testInvalidLogin_TC_AUTH_002() {
        Map<String, String> loginBody = Map.of("phone", "1234567890", "password", "Wrong@1234");
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/login", loginBody, String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testRegister_TC_AUTH_003() {
        Map<String, String> registerBody = Map.of(
                "name", "New User",
                "email", "new@example.com",
                "phone", "9876543210",
                "password", "NewUser@123",
                "role", "ROLE_SALES_EXECUTIVE"
        );
        ResponseEntity<String> registerResponse = restTemplate.postForEntity(baseUrl + "/register", registerBody, String.class);
        assertEquals(HttpStatus.OK, registerResponse.getStatusCode());

        Map<String, String> loginBody = Map.of("phone", "9876543210", "password", "NewUser@123");
        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(baseUrl + "/login", loginBody, Map.class);
        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        assertNotNull(loginResponse.getBody().get("token"));
    }

    @Test
    void testRegisterDuplicatePhone_TC_AUTH_004() {
        Map<String, String> registerBody = Map.of(
                "name", "Duplicate User",
                "email", "dup@example.com",
                "phone", "1234567890",
                "password", "Dup@1234",
                "role", "ROLE_SALES_EXECUTIVE"
        );
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl + "/register", registerBody, String.class);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}