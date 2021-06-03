//
//  OAuthManager.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/02.
//

import Foundation
import OctoKit
import AuthenticationServices

class OAuthManager {
    let config = OAuthConfiguration(token: "520492e67c5fff6e4250", secret: "", scopes: ["user"])
    var webAuthSession: ASWebAuthenticationSession?
    let networkManager: Networking
    var userProfile: UserProfile?
    
    init(networkManager: Networking) {
        self.networkManager = networkManager
    }
    
    func authenticate(completion: @escaping () -> Void) -> ASWebAuthenticationSession {
        let url = config.authenticate()?.appending([URLQueryItem(name: "redirect_uri", value: "airbnb://")])
        return ASWebAuthenticationSession.init(url: url!, callbackURLScheme: "airbnb") { (callBackURL: URL?, error: Error?) in
            guard error == nil, let successURL = callBackURL else {
                return
            }
            let code = successURL.absoluteString.split(separator: "=").last
            guard let urlToPost = EndPoint.url(path: .login, queryItems: [URLQueryItem(name: "code", value: String(code!)), URLQueryItem(name: "typeCode", value: "2")]) else { return print("urlTopost")}
            self.networkManager.postData(url: urlToPost, decodeType: UserProfile.self) { userProfile in
                self.userProfile = userProfile
                completion()
            }
        }
    }
}
