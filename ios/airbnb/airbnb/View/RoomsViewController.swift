//
//  RoomsViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/03.
//

import UIKit
import Combine

class RoomsViewController: UIViewController {
    
    @IBOutlet weak var roomCollectionView: UICollectionView!
    
    var findingAccommodationManager: FindingAccommodationManager!
    private var cancelable = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        fetchRoomsList()
        registerXib()
        roomCollectionView.dataSource = self
        bind()
    }
    
    func bind() {
        findingAccommodationManager.$roomList
            .receive(on: DispatchQueue.main)
            .sink { [weak self] _ in
                self?.roomCollectionView.reloadData()
            }
            .store(in: &cancelable)
    }
    
    func setFindingAccommodationManager(object: FindingAccommodationManager) {
        self.findingAccommodationManager = object
    }
    
    func registerXib() {
        let nib = UINib(nibName: RoomCollectionViewCell.nibName, bundle: nil)
        roomCollectionView.register(nib, forCellWithReuseIdentifier: RoomCollectionViewCell.identifier)
    }
    
    func fetchRoomsList() {
        findingAccommodationManager.getAvailableRoomsList()
    }

}

extension RoomsViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return findingAccommodationManager.roomList?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: RoomCollectionViewCell.identifier, for: indexPath) as? RoomCollectionViewCell else { return UICollectionViewCell() }
        guard let manager = findingAccommodationManager.roomList?[indexPath.row] else { return UICollectionViewCell() }
        cell.thumbImageView.load(with: manager.thumbImage)
        cell.title.text = manager.room.title
        cell.pricePerDay.text = manager.room.pricePerDay.convertDecimalWon() + "/ 박"
        cell.totalPrice.text = "총액" + manager.receipt.totalPrice.convertDecimalWon()
        return cell
    }
    
    
}
