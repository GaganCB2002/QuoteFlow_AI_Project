package com.quoteflow.backend.security;

import com.quoteflow.backend.entity.Role;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.UserRepository;
import com.quoteflow.backend.security.HashUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String googleId = oAuth2User.getAttribute("sub");

        if (email == null) {
            response.sendRedirect(frontendUrl + "/login?error=email_not_found");
            return;
        }

        User user = userRepository.findByEmailHash(HashUtil.sha256(email)).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name != null ? name : email.split("@")[0]);
            newUser.setGoogleId(googleId);
            newUser.setRole(Role.ROLE_USER); // Default role
            newUser.setPhone("G-" + (googleId != null && googleId.length() >= 8 ? googleId.substring(0, 8) : System.currentTimeMillis() % 100000000));
            newUser.setIsActive(true);
            return userRepository.save(newUser);
        });

        // If they logged in with Google but didn't have googleId set
        if (user.getGoogleId() == null && googleId != null) {
            user.setGoogleId(googleId);
            userRepository.save(user);
        }

        String token = jwtUtil.generateToken(user);
        
        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
