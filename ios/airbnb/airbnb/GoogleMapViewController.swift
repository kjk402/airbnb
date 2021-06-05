//
//  GoogleMapViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/04.
//

import UIKit
import GoogleMaps

class GoogleMapViewController: UIViewController {
    
    var roomsList: RoomsList!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setMapView()
    }
    
    func setRoomsList(object: RoomsList) {
        self.roomsList = object
    }
    
    func setMapView() {
        let latitude = roomsList[0].room.location.latitude
        let logitude = roomsList[0].room.location.longitude
        let camera = GMSCameraPosition.camera(withLatitude: latitude, longitude: logitude, zoom: 11.0)
        let mapView = GMSMapView.map(withFrame: self.view.frame, camera: camera)
        self.view.addSubview(mapView)
        
        setMarker(mapView: mapView, roomsList: roomsList)
    }
    
    func setMarker(mapView: GMSMapView, roomsList: RoomsList) {
        roomsList.forEach { roomInformation in
            let marker = GMSMarker()
            let latitude = roomInformation.room.location.latitude
            let logitude = roomInformation.room.location.longitude
            marker.position = CLLocationCoordinate2D(latitude: latitude, longitude: logitude)
            marker.title = roomInformation.room.pricePerDay.convertDecimalWon()
            marker.map = mapView
        }
    }
    
}
