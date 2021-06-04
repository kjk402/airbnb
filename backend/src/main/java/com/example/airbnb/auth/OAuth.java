package com.example.airbnb.auth;

import com.example.airbnb.dto.EmailDTO;
import com.example.airbnb.dto.TokenDTO;
import com.example.airbnb.dto.UserInfoDTO;
import com.example.airbnb.utils.GitHubType;

public interface OAuth {

    TokenDTO getTokenAPI(String code, GitHubType gitHubType);

    UserInfoDTO getUserInfoAPI(String token);

    EmailDTO getEmailAPI(String token);
}
