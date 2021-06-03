//
//  OAuthViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/02.
//

import UIKit
import OctoKit
import AuthenticationServices

class OAuthViewController: UIViewController, ASWebAuthenticationPresentationContextProviding {
    
    var webAuthSession: ASWebAuthenticationSession?
    var oauthManager: OAuthManager?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let networkManager = NetworkManager()
        oauthManager = OAuthManager(networkManager: networkManager)
        initializeWebAuthSession()
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        webAuthSession?.presentationContextProvider = self
        webAuthSession?.start()
    }
    
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return self.view.window ?? ASPresentationAnchor()
    }
    
    func initializeWebAuthSession() {
        self.webAuthSession = oauthManager?.authenticate(completion: {
                self.performSegue(withIdentifier: "TabBarController", sender: self)
        })
    }
}
