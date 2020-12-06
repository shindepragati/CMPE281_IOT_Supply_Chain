package com.smartsupplychain.foodsupplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedList;

@Service
public class CargoServiceImpl {

	private CargoDAOImpl cargoDAO;
	
	@Autowired
	public CargoServiceImpl(CargoDAOImpl cargoDAO) {
		this.cargoDAO = cargoDAO;
	}

	public CargoPOJO addCargo(CargoPOJO obj) {
		return cargoDAO.addCargo(obj);
	}

	public CargoPOJO getCargo(String cargoid) {
		return cargoDAO.getCargo(cargoid);
	}

	public PaginatedList<CargoPOJO> getAllCargo() {
		return cargoDAO.getAllCargo();
	}

	public CargoPOJO updateCargo(CargoPOJO obj) {
		return cargoDAO.updateCargo(obj);
	}

	public PaginatedList<CargoPOJO> deleteCargo(String cargoid) {
		return cargoDAO.deleteCargo(cargoid);
	}

}
