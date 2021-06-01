//
//  RangeSlider.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/31.
//

import UIKit

class RangeSlider: UIControl {
    override var frame: CGRect {
      didSet {
        updateLayerFrames()
      }
    }
    
    var minimumValue: CGFloat = 0 {
      didSet {
        updateLayerFrames()
      }
    }

    var maximumValue: CGFloat = 1 {
      didSet {
        updateLayerFrames()
      }
    }

    var lowerValue: CGFloat = 0.2 {
      didSet {
        updateLayerFrames()
      }
    }

    var upperValue: CGFloat = 0.8 {
      didSet {
        updateLayerFrames()
      }
    }

    var trackTintColor = UIColor(white: 0.9, alpha: 1) {
      didSet {
        trackLayer.setNeedsDisplay()
      }
    }

    var trackHighlightTintColor = UIColor(red: 0, green: 0.45, blue: 0.94, alpha: 1) {
      didSet {
        trackLayer.setNeedsDisplay()
      }
    }

    var thumbImage = UIImage(systemName: "pause.circle.fill")! {
      didSet {
        upperThumbImageView.image = thumbImage
        lowerThumbImageView.image = thumbImage
        updateLayerFrames()
      }
    }

    private var previousLocation = CGPoint()
    
    let trackLayer = RangeSliderTrackLayer()
    let lowerThumbImageView = UIImageView()
    let upperThumbImageView = UIImageView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        trackLayer.rangeSlider = self
        trackLayer.contentsScale = UIScreen.main.scale
        layer.addSublayer(trackLayer)
        
        lowerThumbImageView.image = thumbImage
        addSubview(lowerThumbImageView)
        
        upperThumbImageView.image = thumbImage
        addSubview(upperThumbImageView)
        
        updateLayerFrames()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func updateLayerFrames() {
        trackLayer.frame = bounds.insetBy(dx: 0.0, dy: bounds.height / 3)
        trackLayer.setNeedsDisplay()
        lowerThumbImageView.frame = CGRect(origin: thumbOriginForValue(lowerValue),
                                           size: thumbImage.size)
        upperThumbImageView.frame = CGRect(origin: thumbOriginForValue(upperValue),
                                           size: thumbImage.size)
    }
    
    func positionForValue(_ value: CGFloat) -> CGFloat {
      return bounds.width * value
    }
    
    private func thumbOriginForValue(_ value: CGFloat) -> CGPoint {
      let x = positionForValue(value) - thumbImage.size.width / 2.0
      return CGPoint(x: x, y: (bounds.height - thumbImage.size.height) / 2.0)
    }
}

extension RangeSlider {
    override func beginTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
        previousLocation = touch.location(in: self)
        
        if lowerThumbImageView.frame.contains(previousLocation) {
            lowerThumbImageView.isHighlighted = true
        } else if upperThumbImageView.frame.contains(previousLocation) {
            upperThumbImageView.isHighlighted = true
        }
        
        return lowerThumbImageView.isHighlighted || upperThumbImageView.isHighlighted
    }
    
    override func continueTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
        let location = touch.location(in: self)
        
        let deltaLocation = location.x - previousLocation.x
        let deltaValue = (maximumValue-minimumValue) * deltaLocation / bounds.width
        
        previousLocation = location
        
        if lowerThumbImageView.isHighlighted {
            lowerValue += deltaValue
            lowerValue = boundValue(lowerValue, toLowerValue: minimumValue, upperValue: upperValue)
        } else if upperThumbImageView.isHighlighted {
            upperValue += deltaValue
            upperValue = boundValue(upperValue, toLowerValue: lowerValue,
                                    upperValue: maximumValue)
        }
        
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        
        updateLayerFrames()
        
        CATransaction.commit()
        
        sendActions(for: .valueChanged)
        
        return true
    }
    
    private func boundValue(_ value: CGFloat, toLowerValue lowerValue: CGFloat,
                            upperValue: CGFloat) -> CGFloat {
      return min(max(value, lowerValue), upperValue)
    }
    
    override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
        lowerThumbImageView.isHighlighted = false
        upperThumbImageView.isHighlighted = false
    }
}
