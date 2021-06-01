//
//  InformationView.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/25.
//

import UIKit

final class InformationView: UIView {
    
    @IBOutlet weak var locationLabel: UILabel!
    @IBOutlet weak var periodLabel: UILabel!
    @IBOutlet weak var feeLabel: UILabel!
    @IBOutlet weak var numberOfPeopleLabel: UILabel!
    
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        xibSetUp()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        xibSetUp()
    }
    
    private func xibSetUp() {
        guard let view = loadViewFromNib(nib: "InformationView") else { return }
        view.frame = bounds
        view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(view)
    }
    
    private func loadViewFromNib(nib: String) -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: nib, bundle: bundle)
        return nib.instantiate(withOwner: self, options: nil).first as? UIView
    }
    
    func setLocationLabel(text: String) {
        self.locationLabel.text = text
    }
    
    func setperiodLabel(min: String, max: String) {
        self.periodLabel.text = "\(min) - \(max)"
    }
    
    func setFeeLabel(fee: String) {
        self.feeLabel.text = fee
    }
    
    func setNumberOfPeopleLabel() {
        
    }
}
