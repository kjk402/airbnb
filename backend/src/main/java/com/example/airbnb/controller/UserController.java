package com.example.airbnb.controller;


import com.example.airbnb.dto.UserResponseDTO;
import com.example.airbnb.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import static com.example.airbnb.utils.GitHubType.getGitHubTypeByCode;


@RestController
public class UserController {

    public final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserResponseDTO login(@RequestParam String code, @RequestParam int typeCode) {
        logger.info("로그인 요청");
        return userService.login(code, getGitHubTypeByCode(typeCode));
    }

    @GetMapping("/logout")
    public void logout(@RequestHeader String authorization) {
        logger.info("로그아웃 요청");
        userService.logout(authorization);
    }
}
