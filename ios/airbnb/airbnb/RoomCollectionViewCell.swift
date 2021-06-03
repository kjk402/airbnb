//
//  RoomCollectionViewCell.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/03.
//

import UIKit

class RoomCollectionViewCell: UICollectionViewCell {

    @IBOutlet weak var thumbImageView: UIImageView!
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var pricePerDay: UILabel!
    @IBOutlet weak var totalPrice: UILabel!
    
    static let nibName = "RoomCollectionViewCell"
    static let identifier = "RoomCollectionViewCell"
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

}
