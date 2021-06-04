package com.example.airbnb.service;

import com.example.airbnb.auth.GitHubOAuth;
import com.example.airbnb.auth.OAuth;
import com.example.airbnb.dao.UserDAO;
import com.example.airbnb.domain.User;
import com.example.airbnb.dto.EmailDTO;
import com.example.airbnb.dto.TokenDTO;
import com.example.airbnb.dto.UserInfoDTO;
import com.example.airbnb.dto.UserResponseDTO;
import com.example.airbnb.exception.EntityNotFoundException;
import com.example.airbnb.exception.ErrorMessage;
import com.example.airbnb.exception.TokenException;
import com.example.airbnb.utils.GitHubType;
import com.example.airbnb.utils.JwtUtil;
import org.springframework.stereotype.Service;

import static com.example.airbnb.domain.User.createUser;
import static com.example.airbnb.dto.UserResponseDTO.createUserResponseDTO;

@Service
public class UserService {

    private final UserDAO userDAO;
    private final OAuth gitHubOAuth;

    public UserService(UserDAO userDAO, GitHubOAuth gitHubOAuth) {
        this.userDAO = userDAO;
        this.gitHubOAuth = gitHubOAuth;
    }

    public UserResponseDTO login(String code, GitHubType gitHubType) {
        TokenDTO tokenDTO = tokenRequestApi(code, gitHubType);
        UserInfoDTO userInfoDTO = userInfoRequestApi(tokenDTO.getAccessToken());
        EmailDTO emailDTO = emailRequestApi(tokenDTO.getAccessToken());
        if (verifyUser(userInfoDTO.getUserId())) {
            User user = findByUserId(userInfoDTO.getUserId());
            user.update(userInfoDTO, emailDTO, tokenDTO);
            userDAO.save(user);
            return createUserResponseDTO(user, JwtUtil.createToken(user.getUserId()));
        }
        User user = createUser(userInfoDTO, emailDTO, tokenDTO);
        userDAO.save(user);
        return createUserResponseDTO(user, JwtUtil.createToken(user.getUserId()));
    }

    public void logout(String authorization) {
        User user = getUserFromAuthorization(userDAO, authorization);
        user.removeToken();
        userDAO.save(user);
    }

    private TokenDTO tokenRequestApi(String code, GitHubType gitHubType) {
        return gitHubOAuth.getTokenAPI(code, gitHubType);
    }

    private UserInfoDTO userInfoRequestApi(String token) {
        return gitHubOAuth.getUserInfoAPI(token);
    }

    private EmailDTO emailRequestApi(String token) {
        return gitHubOAuth.getEmailAPI(token);
    }

    private boolean verifyUser(String userId) {
        return userDAO.findByUserId(userId).isPresent();
    }

    private User findByUserId(String userId) {
        return userDAO.findByUserId(userId).orElseThrow(EntityNotFoundException::new);
    }

    public static User getUserFromAuthorization(UserDAO userDAO, String authorization) {
        User user = userDAO.findByUserId(JwtUtil.getUserIdFromToken(JwtUtil.getTokenFromAuthorization(authorization))).orElseThrow(EntityNotFoundException::new);
        if (user.getToken() == null) {
            throw new TokenException(ErrorMessage.INVALID_TOKEN);
        }
        return user;
    }

}
