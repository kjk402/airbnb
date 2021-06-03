//
//  FindingAccommodationManager.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/25.
//

import Foundation

final class FindingAccommodationManager {
    private(set) var cityName: String?
    private(set) var checkIn: String?
    @Published private(set) var checkOut: String?
    private var allPrices: [Int]?
    @Published private(set) var averagePrices: Int?
    @Published private(set) var maxPrice: Int?
    @Published private(set) var minPrice: Int?
    @Published private(set) var numOfPeople: Int?
    @Published private(set) var roomList: RoomsList?
    private let networkManager: Networking
    
    init(cityName: String? = nil, checkIn: String? = nil, checkOut: String? = nil, allPrices: [Int]? = nil, averagePrices: Int? = nil, maxPrice: Int? = nil, minPrice: Int? = nil, numOfPeople: Int? = nil, networkManager: Networking) {
        self.cityName = cityName
        self.checkIn = checkIn
        self.checkOut = checkOut
        self.allPrices = allPrices
        self.averagePrices = averagePrices
        self.maxPrice = maxPrice
        self.minPrice = minPrice
        self.numOfPeople = numOfPeople
        self.networkManager = networkManager
    }
    
    func getAvailableRoomsPrices() {
        guard let cityName = cityName, let checkIn = checkIn, let checkOut = checkOut else { return }
        var queryItems = [URLQueryItem]()
        queryItems.append(QueryItems.cityName.assign(value: cityName))
        queryItems.append(QueryItems.checkIn.assign(value: checkIn))
        queryItems.append(QueryItems.checkOut.assign(value: checkOut))
        
        guard let url = EndPoint.url(path: .price, queryItems: queryItems) else { return }
        
        networkManager.getData(url: url, decodableType: RoomsPrice.self) { price in
            self.allPrices = price.allPrices
            self.averagePrices = price.averagePrice
        }
    }
    
    func getAvailableRoomsList() {
        var queryItems = [URLQueryItem]()
        queryItems.append(QueryItems.checkIn.assign(value: checkIn!))
        queryItems.append(QueryItems.checkOut.assign(value: checkOut!))
        queryItems.append(QueryItems.cityName.assign(value: cityName!))
        queryItems.append(QueryItems.maxPrice.assign(value: String(maxPrice!)))
        queryItems.append(QueryItems.minPrice.assign(value: String(minPrice!)))
        queryItems.append(QueryItems.numOfPeople.assign(value: String(numOfPeople!)))
        
        guard let url = EndPoint.url(path: .search, queryItems: queryItems) else { return }
        
        networkManager.getData(url: url, decodableType: RoomsList.self) { roomList in
            self.roomList = roomList
        }
    }
    
    func getCityName(cityName: String) {
        self.cityName = cityName
    }
    
    func setCheckInAndOut(checkIn: String?, checkOut: String?) {
        self.checkIn = checkIn
        self.checkOut = checkOut
    }
    
    func setMaxAndMin(max: Int, min: Int) {
        self.maxPrice = max
        self.minPrice = min
    }
    
    func setNumberOfPeople(num: Int) {
        self.numOfPeople = num
    }
}
