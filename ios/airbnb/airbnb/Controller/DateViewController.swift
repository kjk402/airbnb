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
    private var findingAccommodationManager: FindingAccommodationManager!
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
        setNextButton()
    }
    
    func bind() {
        findingAccommodationManager.$checkOut
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
        self.informationView.locationLabel.text = findingAccommodationManager.cityName
    }
    
    private func setNextButton() {
        bottomView.rightButton.addTarget(self, action: #selector(nextButtonTapped), for: .touchUpInside)
    }
    
    @objc func nextButtonTapped() {
        guard let viewController = storyboard?.instantiateViewController(identifier: "FeeViewController") as? FeeViewController else { return }
        viewController.setFindingAccommodationManafer(object: findingAccommodationManager)
        self.navigationController?.pushViewController(viewController, animated: true)
    }
    
    func getFindingAccommodationManager(object: FindingAccommodationManager) {
        self.findingAccommodationManager = object
    }
}

extension DateViewController: FSCalendarDelegate {
    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPosition: FSCalendarMonthPosition) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let minDate = dateFormatter.string(from: calendar.selectedDates.min()!)
        let maxDate = dateFormatter.string(from: calendar.selectedDates.max()!)
        
        if calendar.selectedDates.count >= 2 {
            self.informationView.periodLabel.text = "\(minDate) - \(maxDate)"
            findingAccommodationManager.setCheckInAndOut(checkIn: minDate, checkOut: maxDate)
            selectDateRange(calendar: calendar)
        } else if calendar.selectedDates.count == 1 {
            self.informationView.periodLabel.text = "\(minDate)"
            findingAccommodationManager.setCheckInAndOut(checkIn: minDate, checkOut: nil)
        } else {
            self.informationView.periodLabel.text = ""
            findingAccommodationManager.setCheckInAndOut(checkIn: nil, checkOut: nil)
        }
        
    }
    
    func calendar(_ calendar: FSCalendar, didDeselect date: Date, at monthPosition: FSCalendarMonthPosition) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MM월 dd일"
        
        guard let min = calendar.selectedDates.min() else {
            self.informationView.periodLabel.text = ""
            findingAccommodationManager.setCheckInAndOut(checkIn: nil, checkOut: nil)
            return
        }
        let formattingMinDate = dateFormatter.string(from: min)
        
        if calendar.selectedDates.count == 1 {
            self.informationView.periodLabel.text = "\(formattingMinDate)"
            findingAccommodationManager.setCheckInAndOut(checkIn: formattingMinDate, checkOut: nil)
        } else if calendar.selectedDates.count > 1 {
            let maxDate = calendar.selectedDates.max()!
            let formattingMaxDate = dateFormatter.string(from: maxDate)
            self.informationView.periodLabel.text = "\(formattingMinDate) - \(formattingMaxDate)"
            findingAccommodationManager.setCheckInAndOut(checkIn: formattingMinDate, checkOut: formattingMaxDate)
        }
    }
    
    func selectDateRange(calendar: FSCalendar) {
        var dateRange = [Date]()
        let min = calendar.selectedDates.min()
        let max = calendar.selectedDates.max()
        dateRange.append(min!)
        if Calendar.current.date(byAdding: .day, value: 1, to: min!) == max! {
            return
        }
        while true {
            let minDate = Calendar.current.date(byAdding: .day, value: 1, to: dateRange.last!)
            dateRange.append(minDate!)
            if Calendar.current.date(byAdding: .day, value: 1, to: minDate!) == calendar.selectedDates.max() {
                dateRange.forEach { calendar.select($0) }
                return
            }
        }
    }
}
