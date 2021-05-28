package com.example.airbnb.auth;

public class GithubUser {

    private String githubId;
    private String nickname;
    private String name;
    private String githubEmail;

    public GithubUser() {}

    public GithubUser(String githubId, String nickname, String name, String githubEmail) {
        this.githubId = githubId;
        this.nickname = nickname;
        this.name = name;
        this.githubEmail = githubEmail;
    }

    public String getGithubId() {
        return githubId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getName() {
        return name;
    }

    public String getGithubEmail() {
        return githubEmail;
    }

}
