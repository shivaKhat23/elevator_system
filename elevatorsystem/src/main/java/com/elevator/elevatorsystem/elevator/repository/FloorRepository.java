package com.elevator.elevatorsystem.elevator.repository;

import com.elevator.elevatorsystem.elevator.domain.Floor;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FloorRepository extends ListCrudRepository<Floor, UUID>, JpaSpecificationExecutor<Floor> {

    List<Floor> findAllByBuildingIdOrderByNumber(UUID buildingId);
}
