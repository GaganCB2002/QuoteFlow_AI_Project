package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.AuthRequest;
import com.quoteflow.backend.dto.AuthResponse;
import com.quoteflow.backend.dto.RegisterRequest;
import com.quoteflow.backend.entity.Role;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.UserRepository;
import com.quoteflow.backend.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.quoteflow.backend.security.HashUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthRequest authRequest, HttpServletRequest request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getPhone(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Incorrect phone or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getPhone());
        final String jwt = jwtUtil.generateToken(userDetails);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwt);

        if (userDetails instanceof User user) {
            authResponse.setUserId(user.getId().toString());
            authResponse.setUserName(user.getName());
            authResponse.setUserEmail(user.getEmail());
            authResponse.setCompanyName(user.getCompany() != null ? user.getCompany().getCompanyName() : "");
            authResponse.setRole(user.getRole().name());
            authResponse.setRequiresTfa(false); // Can be updated if TFA is implemented later

            try {
                String ipAddress = request.getHeader("X-Forwarded-For");
                if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                    ipAddress = request.getRemoteAddr();
                }
                user.setRegistrationIp(ipAddress);
                user.setRegistrationUserAgent(request.getHeader("User-Agent"));
                userRepository.save(user);
            } catch (Exception ignored) {
            }
        }

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
        String phoneHash = HashUtil.sha256(registerRequest.getPhone());
        String emailHash = HashUtil.sha256(registerRequest.getEmail());

        if (userRepository.existsByPhoneHash(phoneHash)) {
            return ResponseEntity.badRequest().body("Phone number is already registered.");
        }

        if (!isValidPassword(registerRequest.getPassword())) {
            return ResponseEntity.badRequest().body("Password must be at least 8 characters with uppercase, lowercase, digit, and special character.");
        }

        Role role;
        try {
            role = Role.valueOf(registerRequest.getRole());
            if (role == Role.ROLE_SUPER_ADMIN) {
                return ResponseEntity.badRequest().body("Cannot register as SUPER_ADMIN.");
            }
        } catch (IllegalArgumentException e) {
            role = Role.ROLE_USER;
        }

        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        String userAgent = request.getHeader("User-Agent");

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .phone(registerRequest.getPhone())
                .phoneHash(phoneHash)
                .emailHash(emailHash)
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .registrationIp(ipAddress)
                .registrationUserAgent(userAgent)
                .trialStartDate(java.time.LocalDateTime.now())
                .trialEndDate(java.time.LocalDateTime.now().plusDays(7))
                .subscriptionStatus("TRIAL")
                .isActive(true)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    private boolean isValidPassword(String password) {
        return password != null && password.matches(PASSWORD_PATTERN);
    }
}
