//
//  PersonnelView.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/01.
//

import UIKit

class PersonnelView: UIView {
    
    @IBOutlet weak var theNumberOfAdult: UILabel!
    @IBOutlet weak var theNumberOfKid: UILabel!
    @IBOutlet weak var theNumberOfInfant: UILabel!
    @IBOutlet weak var addAdultButton: UIButton!
    @IBOutlet weak var addKidButton: UIButton!
    @IBOutlet weak var addInfantButton: UIButton!
    @IBOutlet weak var subtractAdultButton: UIButton!
    @IBOutlet weak var subtractKidButton: UIButton!
    @IBOutlet weak var subtractInfantButton: UIButton!
    

    override init(frame: CGRect) {
        super.init(frame: frame)
        setXib()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setXib()
    }
    
    func setXib() {
        guard let view = loadViewFromNib(nib: "PersonnelView") else { return }
        view.frame = bounds
        view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(view)
    }
    
    func loadViewFromNib(nib: String) -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: nib, bundle: bundle)
        return nib.instantiate(withOwner: self, options: nil).first as? UIView
    }
}
