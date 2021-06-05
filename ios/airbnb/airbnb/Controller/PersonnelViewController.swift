//
//  PersonnelViewController.swift
//  airbnb
//
//  Created by 양준혁 on 2021/06/01.
//

import UIKit
import Combine

final class PersonnelViewController: UIViewController {
    
    @IBOutlet weak var personnelView: PersonnelView!
    @IBOutlet weak var informationView: InformationView!
    @IBOutlet weak var bottomView: BottomView!
    
    private let personnel = Perssonel(adult: 0, kid: 0, infant: 0)
    private var findingAccommodationManager: FindingAccommodationManager!
    private var cancelable = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "숙소 찾기"
        bind()
        addAction()
        setInformationView()
        setBottomViewButton()
    }
    
    private func bind() {
        personnel.$adult
            .receive(on: DispatchQueue.main)
            .sink { [weak self] adult in
                guard let adult = adult, let numberOfPeople = self?.personnel.getTheNumberOfPeople() else { return }
                self?.personnelView.theNumberOfAdult.text = "\(adult)"
                if adult == 0 {
                    self?.personnelView.subtractAdultButton.isEnabled = false
                } else {
                    self?.personnelView.subtractAdultButton.isEnabled = true
                }
                self?.findingAccommodationManager.setNumberOfPeople(num: numberOfPeople)
            }
            .store(in: &cancelable)
        
        personnel.$kid
            .receive(on: DispatchQueue.main)
            .sink { [weak self] kid in
                guard let kid = kid, let numberOfPeople = self?.personnel.getTheNumberOfPeople() else { return }
                self?.personnelView.theNumberOfKid.text = "\(kid)"
                if kid == 0 {
                    self?.personnelView.subtractKidButton.isEnabled = false
                } else {
                    self?.personnelView.subtractKidButton.isEnabled = true
                }
                self?.findingAccommodationManager.setNumberOfPeople(num: numberOfPeople)
            }
            .store(in: &cancelable)
        
        personnel.$infant
            .receive(on: DispatchQueue.main)
            .sink { [weak self] infant in
                guard let infant = infant, let numberOfPeople = self?.personnel.getTheNumberOfPeople() else { return }
                self?.personnelView.theNumberOfInfant.text = "\(infant)"
                if infant == 0 {
                    self?.personnelView.subtractInfantButton.isEnabled = false
                } else {
                    self?.personnelView.subtractInfantButton.isEnabled = true
                }
                self?.findingAccommodationManager.setNumberOfPeople(num: numberOfPeople)
            }
            .store(in: &cancelable)
        
        findingAccommodationManager.$numOfPeople
            .receive(on: DispatchQueue.main)
            .sink { [weak self] numOfPeople in
                guard let numOfPeople = numOfPeople else { return }
                self?.informationView.setNumberOfPeopleLabel(count: numOfPeople)
                if numOfPeople > 0 {
                    self?.bottomView.leftButton.setTitle("지우기", for: .normal)
                    self?.bottomView.rightButton.setTitle("검색", for: .normal)
                    self?.bottomView.rightButton.setTitleColor(.black, for: .normal)
                    self?.bottomView.rightButton.isEnabled = true
                } else {
                    self?.bottomView.leftButton.setTitle("건너뛰기", for: .normal)
                    self?.bottomView.rightButton.setTitle("다음", for: .normal)
                    self?.bottomView.rightButton.setTitleColor(.gray, for: .normal)
                    self?.bottomView.rightButton.isEnabled = false
                }
            }
            .store(in: &cancelable)
    }
    
    private func setInformationView() {
        informationView.setLocationLabel(text: findingAccommodationManager.cityName!)
        informationView.setperiodLabel(min: findingAccommodationManager.checkIn!, max: findingAccommodationManager.checkOut!)
        
        let min = findingAccommodationManager.minPrice!.convertDecimalWon()
        let max = findingAccommodationManager.maxPrice!.convertDecimalWon()
        informationView.setMinLabel(fee: min + "-")
        informationView.setMaxLabel(fee: max)
    }
    
    func setBottomViewButton() {
        self.bottomView.rightButton.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
    }
    
    @objc func buttonTapped() {
        guard let viewController = storyboard?.instantiateViewController(identifier: "RoomsViewController") as? RoomsViewController else { return }
        viewController.setFindingAccommodationManager(object: findingAccommodationManager)
        navigationController?.pushViewController(viewController, animated: true)
    }
    
    func decimalWon(value: Int) -> String {
        let numberFormatter = NumberFormatter()
        numberFormatter.numberStyle = .decimal
        let result = "₩" + numberFormatter.string(from: NSNumber(value: value))!
        
        return result
    }
    
    func setFindingAccommodationManager(object: FindingAccommodationManager) {
        self.findingAccommodationManager = object
    }
    
    private func addAction() {
        personnelView.addAdultButton.addTarget(self, action: #selector(addAdult), for: .touchUpInside)
        personnelView.addKidButton.addTarget(self, action: #selector(addKid), for: .touchUpInside)
        personnelView.addInfantButton.addTarget(self, action: #selector(addInfant), for: .touchUpInside)
        personnelView.subtractAdultButton.addTarget(self, action: #selector(subtractAdult), for: .touchUpInside)
        personnelView.subtractKidButton.addTarget(self, action: #selector(subtractKid), for: .touchUpInside)
        personnelView.subtractInfantButton.addTarget(self, action: #selector(subtractInfant), for: .touchUpInside)
    }
    
    @objc func addAdult() {
        personnel.add(type: .adult)
    }
    @objc func addKid() {
        if personnel.getTheNumberOfAdult() == 0 {
            personnel.add(type: .adult)
        }
        personnel.add(type: .kid)
    }
    @objc func addInfant() {
        if personnel.getTheNumberOfAdult() == 0 {
            personnel.add(type: .adult)
        }
        personnel.add(type: .infant)
    }
    @objc func subtractAdult() {
        personnel.subtract(type: .adult)
    }
    @objc func subtractKid() {
        personnel.subtract(type: .kid)
    }
    @objc func subtractInfant() {
        personnel.subtract(type: .infant)
    }
}
