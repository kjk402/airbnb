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
        bind()
        addAction()
        setInformationView()
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
                    self?.bottomView.rightButton.setTitleColor(.black, for: .normal)
                    self?.bottomView.rightButton.isEnabled = true
                } else {
                    self?.bottomView.leftButton.setTitle("검색", for: .normal)
                    self?.bottomView.rightButton.setTitleColor(.lightGray, for: .normal)
                    self?.bottomView.rightButton.isEnabled = false
                }
            }
            .store(in: &cancelable)
    }
    
    private func setInformationView() {
        informationView.setLocationLabel(text: findingAccommodationManager.cityName!)
        informationView.setperiodLabel(min: findingAccommodationManager.checkIn!, max: findingAccommodationManager.checkOut!)
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
