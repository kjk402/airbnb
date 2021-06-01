//
//  FeeViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/27.
//

import UIKit
import Charts

class FeeViewController: UIViewController {

    @IBOutlet weak var lineChartView: LineChartView!
    
    var findingAccommodationManager: FindingAccommodationManager!
    let rangeSlider = RangeSlider(frame: .zero)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setChartView()
        setRangeSlider()
    }
    
    @objc func rangeSliderValueChanged(rangeSlider: RangeSlider) {
        setChartData()
    }
    
    func setRangeSlider() {
        view.addSubview(rangeSlider)
        rangeSlider.frame = CGRect(x: 0, y: 0, width: view.bounds.size.width-32, height: 30)
        rangeSlider.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            rangeSlider.heightAnchor.constraint(equalToConstant: 30),
            rangeSlider.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 24),
            rangeSlider.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: 24),
            rangeSlider.topAnchor.constraint(equalTo: lineChartView.bottomAnchor)
        ])
        rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged(rangeSlider:)), for: .valueChanged)
    }
    
    func setFindingAccommodationManafer(object: FindingAccommodationManager) {
        self.findingAccommodationManager = object
    }
    
    func setChartView() {
        lineChartView.backgroundColor = .white
        lineChartView.xAxis.enabled = false
        lineChartView.leftAxis.enabled = false
        lineChartView.rightAxis.enabled = false
        lineChartView.legend.enabled = false
        lineChartView.doubleTapToZoomEnabled = false
        
    }
    
    func setChartData() {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
        let unitsSold = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
        var dataEntries1: [ChartDataEntry] = []
        var dataEntries2: [ChartDataEntry] = []
        var dataEntries3: [ChartDataEntry] = []
//        for i in 0..<months.count {
//            let dataEntry = ChartDataEntry(x: Double(i), y: unitsSold[i])
//            dataEntries.append(dataEntry)
//        }
        var dataSet1: LineChartDataSet
        var dataSet2: LineChartDataSet
        var dataSet3: LineChartDataSet
        var dataSets = [LineChartDataSet]()
        
//        let minimumIndex = Int(minimum * CGFloat(months.count))
//        let maximumIndex = Int(maximum * CGFloat(months.count))
        
        for i in 0..<4 {
            let dataEntry = ChartDataEntry(x: Double(i), y: unitsSold[i])
            dataEntries1.append(dataEntry)
        }
//        dataSet1 = LineChartDataSet(dataEntries1)
//        dataSet1.lineWidth = 2.0
//        dataSet1.circleRadius = 6.0
//        dataSet1.fillAlpha = 1
//        dataSet1.fillColor = UIColor.green
//        dataSet1.drawFilledEnabled = true
//        dataSets.append(dataSet1)
        
        for i in 4..<7 {
            let dataEntry = ChartDataEntry(x: Double(i), y: unitsSold[i])
            dataEntries2.append(dataEntry)
        }
        dataSet2 = LineChartDataSet(dataEntries2)
        dataSets.append(dataSet2)
        
        for i in 7...months.count-1 {
            let dataEntry = ChartDataEntry(x: Double(i), y: unitsSold[i])
            dataEntries3.append(dataEntry)

        }
        dataSet3 = LineChartDataSet(dataEntries3)
        dataSets.append(dataSet3)

//        let chartDataSet = LineChartDataSet(entries: dataEntries, label: "판매량")
//        chartDataSet.mode = .cubicBezier
//        chartDataSet.drawCirclesEnabled = false
//        chartDataSet.setColor(.white)
//        chartDataSet.fill = Fill(CGColor: #colorLiteral(red: 0.1999770403, green: 0.2000164688, blue: 0.1999686062, alpha: 1))
//        chartDataSet.fillAlpha = 1
//        chartDataSet.drawFilledEnabled = true
//        chartDataSet.drawHorizontalHighlightIndicatorEnabled = false
//        chartDataSet.drawVerticalHighlightIndicatorEnabled = false

        // 데이터 삽입
        dataSets.forEach { setDataSet(dataSet: $0) }
        
        let chartData = LineChartData(dataSets: dataSets)
        chartData.setDrawValues(false)
        lineChartView.data = chartData
    }
    
    func setDataSet(dataSet: LineChartDataSet) {
        dataSet.mode = .cubicBezier
        dataSet.drawCirclesEnabled = false
        dataSet.setColor(.white)
        dataSet.fill = Fill(CGColor: #colorLiteral(red: 0.1999770403, green: 0.2000164688, blue: 0.1999686062, alpha: 1))
        dataSet.fillAlpha = 1
        dataSet.drawFilledEnabled = true
        dataSet.drawHorizontalHighlightIndicatorEnabled = false
        dataSet.drawVerticalHighlightIndicatorEnabled = false

    }
}

enum DataColor {
    case dark, white
    
    var color: UIColor {
        switch self {
        case .dark:
            return #colorLiteral(red: 0.1999770403, green: 0.2000164688, blue: 0.1999686062, alpha: 1)
        case .white:
            return #colorLiteral(red: 0.8801110387, green: 0.8801110387, blue: 0.8801110387, alpha: 1)
        }
    }
}
