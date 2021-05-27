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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setChartView()
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
        
        setChartData()
    }
    
    func setChartData() {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let unitsSold = [20.0, 4.0, 6.0, 3.0, 12.0, 16.0, 4.0, 18.0, 2.0, 4.0, 5.0, 4.0]
        var dataEntries: [ChartDataEntry] = []
        for i in 0..<months.count {
            let dataEntry = ChartDataEntry(x: Double(i), y: unitsSold[i])
            dataEntries.append(dataEntry)
        }

        let chartDataSet = LineChartDataSet(entries: dataEntries, label: "판매량")
        chartDataSet.mode = .cubicBezier
        chartDataSet.drawCirclesEnabled = false
        chartDataSet.setColor(.white)
        chartDataSet.fill = Fill(CGColor: #colorLiteral(red: 0.1999770403, green: 0.2000164688, blue: 0.1999686062, alpha: 1))
        chartDataSet.fillAlpha = 1
        chartDataSet.drawFilledEnabled = true
        chartDataSet.drawHorizontalHighlightIndicatorEnabled = false
        chartDataSet.drawVerticalHighlightIndicatorEnabled = false
        // 차트 컬러
        chartDataSet.colors = [.systemBlue]

        // 데이터 삽입
        let chartData = LineChartData(dataSet: chartDataSet)
        chartData.setDrawValues(false)
        lineChartView.data = chartData
    }

}


