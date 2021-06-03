//
//  RoomsList.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/25.
//

import Foundation

struct RoomInformation: Decodable {
    let room: Room
    let thumbImage: String
    let receipt: Receipt
}

struct Receipt: Decodable {
    let basicPrice: Int
    let weekSalePrice: Int
    let cleaningFee: Int
    let serviceFee: Int
    let resultFee: Int
    let totalPrice: Int
}

struct Room: Decodable {
    let id: Int
    let title: String
    let description: String
    let pricePerDay: Int
    let roomType: String
    let bed: Int
    let maxGuest: Int
    let bathRoom: Int?
    let location: Location
}

struct Location: Decodable {
    let latitude: Double
    let longitude: Double
}

typealias RoomsList = [RoomInformation]
