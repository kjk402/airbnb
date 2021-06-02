//
//  Personnel.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/01.
//

import Foundation
import Combine

class Perssonel: NSObject {
    @Published var adult: Int?
    @Published var kid: Int?
    @Published var infant: Int?
    
    init(adult: Int?, kid: Int?, infant: Int?) {
        self.adult = adult
        self.kid = kid
        self.infant = infant
    }
    
    func add(type: Person) {
        switch type {
        case .adult:
            self.adult? += 1
        case .kid:
            self.kid? += 1
        case .infant:
            self.infant? += 1
        }
    }
    
    func subtract(type: Person) {
        switch type {
        case .adult:
            if adult == 0 {
                return
            } else {
                adult! -= 1
            }
        case .kid:
            if kid == 0 {
                return
            } else {
                kid! -= 1
            }
        case .infant:
            if infant == 0 {
                return
            } else {
                infant! -= 1
            }
        }
    }
    
    func getTheNumberOfAdult() -> Int {
        return self.adult!
    }
    
    func getTheNumberOfPeople() -> Int {
        return adult! + kid! + infant!
    }
}

enum Person {
    case adult, kid, infant
}

