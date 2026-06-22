package com.quoteflow.backend.security;

import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String phoneHash = HashUtil.sha256(username);
        return userRepository.findByPhoneHash(phoneHash)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with phone: " + username));
    }
}
