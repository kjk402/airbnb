//
//  Int+DecimalFormat.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/03.
//

import Foundation

extension Int {
    func convertDecimalWon() -> String {
        let numberFormatter = NumberFormatter()
        numberFormatter.numberStyle = .decimal
        let result = "₩" + numberFormatter.string(from: NSNumber(value: self))!
        return result
    }
}
