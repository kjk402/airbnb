//
//  UserProfile.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/02.
//

import Foundation

struct UserProfile: Decodable {
    let email: String?
    let name: String?
    let token: String?
    let userId: String?
}
