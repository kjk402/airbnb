//
//  DateViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/05/24.
//

import UIKit
import FSCalendar
import Combine

final class DateViewController: UIViewController {

    @IBOutlet weak var calendarView: FSCalendar!
    @IBOutlet weak var informationView: InformationView!
    @IBOutlet weak var bottomView: BottomView!
    private var findingAccmmodationManager: FindingAccommodationManager!
    private var cancelable = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        calendarView.delegate = self
        setUpCalendarView()
        navigationItem.title = "숙소 찾기"
        tabBarController?.tabBar.isHidden = false
        setInformationView()
        tabBarController?.tabBar.isHidden = true
        bind()
    }
    
    func bind() {
        findingAccmmodationManager.$checkOut
            .receive(on: DispatchQueue.main)
            .sink { checkOut in
                if checkOut != nil {
                    self.bottomView.leftButton.setTitle("지우기", for: .normal)
                    self.bottomView.rightButton.setTitleColor(.black, for: .normal)
                    self.bottomView.rightButton.isEnabled = true
                } else {
                    self.bottomView.leftButton.setTitle("건너뛰기", for: .normal)
                    self.bottomView.rightButton.setTitleColor(.lightGray, for: .normal)
                    self.bottomView.rightButton.isEnabled = false
                }
            }
            .store(in: &self.cancelable)
    }
 
    private func setUpCalendarView() {
        calendarView.allowsMultipleSelection = true
        calendarView.swipeToChooseGesture.isEnabled = true
        calendarView.scrollDirection = .vertical
        calendarView.appearance.headerDateFormat = "YYYY년 M월"
        calendarView.appearance.headerTitleColor = .black
        calendarView.locale = Locale(identifier: "ko_KR")
    }
    
    private func setInformationView() {
        self.informationView.locationLabel.text = findingAccmmodationManager.cityName
    }
    
    func getFindingAccommodationManager(object: FindingAccommodationManager) {
        self.findingAccmmodationManager = object
    }
}

extension DateViewController: FSCalendarDelegate {
    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPosition: FSCalendarMonthPosition) {
        if calendar.selectedDates.count == 2 {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "MM월 dd일"
            let minDate = dateFormatter.string(from: calendar.selectedDates.min()!)
            let maxDate = dateFormatter.string(from: calendar.selectedDates.max()!)
            self.informationView.periodLabel.text = "\(minDate) - \(maxDate)"
        }
        
    }
    
    func calendar(_ calendar: FSCalendar, didDeselect date: Date, at monthPosition: FSCalendarMonthPosition) {
        
    }
    
    func calendar(_ calendar: FSCalendar, shouldSelect date: Date, at monthPosition: FSCalendarMonthPosition) -> Bool {
        if calendar.selectedDates.count == 2  {
            return false
        }
        return true
    }
}
