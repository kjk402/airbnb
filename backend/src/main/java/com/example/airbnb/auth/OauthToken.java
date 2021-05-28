package com.example.airbnb.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OauthToken {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty(value = "token_type")
    private String tokenType;

    @JsonProperty("scope")
    private String scope;

    public OauthToken(String accessToken, String tokenType, String scope) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.scope = scope;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getScope() {
        return scope;
    }

}
