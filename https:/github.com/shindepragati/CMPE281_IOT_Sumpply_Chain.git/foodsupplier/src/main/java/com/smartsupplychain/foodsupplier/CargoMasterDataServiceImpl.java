package com.smartsupplychain.foodsupplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedList;
@Service
public class CargoMasterDataServiceImpl {

	private CargoMasterDataDAOImpl cargoDAO;

	@Autowired
	public CargoMasterDataServiceImpl(CargoMasterDataDAOImpl cargoDAO) {
		this.cargoDAO = cargoDAO;
	}

	public CargoMasterDataPOJO addCargo(CargoMasterDataPOJO obj) {
		return cargoDAO.addCargo(obj);
	}

	public CargoMasterDataPOJO getCargo(String cargoid) {
		return cargoDAO.getCargo(cargoid);
	}

	public PaginatedList<CargoMasterDataPOJO> getAllCargo() {
		return cargoDAO.getAllCargo();
	}

	public CargoMasterDataPOJO updateCargo(CargoMasterDataPOJO obj) {
		return cargoDAO.updateCargo(obj);
	}

	public PaginatedList<CargoMasterDataPOJO> deleteCargo(String cargoid) {
		return cargoDAO.deleteCargo(cargoid);
	}
}
