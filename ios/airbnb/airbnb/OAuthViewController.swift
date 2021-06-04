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
        setBackgroundAnimation()
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
    
    private func setBackgroundAnimation() {
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = self.view.bounds
        
        let colors: [CGColor] = [ #colorLiteral(red: 0.4989262223, green: 0.2519669533, blue: 0.7005652785, alpha: 1), #colorLiteral(red: 0.8642135859, green: 0.2082472444, blue: 0.4913758636, alpha: 1), #colorLiteral(red: 0.99425596, green: 0.781129241, blue: 0.398478359, alpha: 1) ]
        gradientLayer.colors = colors
        gradientLayer.startPoint = CGPoint(x: 0.5, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 0.5, y: 1.0)
        
        let changedColors: [CGColor] = [ #colorLiteral(red: 0.99425596, green: 0.781129241, blue: 0.398478359, alpha: 1), #colorLiteral(red: 0.8642135859, green: 0.2082472444, blue: 0.4913758636, alpha: 1), #colorLiteral(red: 0.4989262223, green: 0.2519669533, blue: 0.7005652785, alpha: 1) ]
        let colorAnimation = CABasicAnimation(keyPath: "colors")
        colorAnimation.toValue = changedColors
        colorAnimation.duration = 3
        colorAnimation.autoreverses = true
        colorAnimation.repeatCount = .infinity
        
        gradientLayer.add(colorAnimation, forKey: "colorChangeAnimation")
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
}
