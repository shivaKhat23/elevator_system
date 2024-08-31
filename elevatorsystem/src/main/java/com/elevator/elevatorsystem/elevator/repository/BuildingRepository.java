package com.elevator.elevatorsystem.elevator.repository;

import com.elevator.elevatorsystem.elevator.domain.Building;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BuildingRepository extends ListCrudRepository<Building, UUID>, JpaSpecificationExecutor<Building> {
}
