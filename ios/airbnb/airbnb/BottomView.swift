//
//  BottomView.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/26.
//

import UIKit

class BottomView: UIView {

    @IBOutlet weak var leftButton: UIButton!
    @IBOutlet weak var rightButton: UIButton!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        xibSetUp()
        rightButton.setTitleColor(.lightGray, for: .normal)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        xibSetUp()
        rightButton.setTitleColor(.lightGray, for: .normal)
    }
    @IBAction func convertNextView(completion: () -> Void) {
        completion()
    }
    
    private func xibSetUp() {
        guard let view = loadViewFromNib(nib: "BottomView") else { return }
        view.frame = bounds
        view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addSubview(view)
    }
    
    private func loadViewFromNib(nib: String) -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: nib, bundle: bundle)
        return nib.instantiate(withOwner: self, options: nil).first as? UIView
    }

}
