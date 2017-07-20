package ro.riscutiatudor.core;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import ro.riscutiatudor.core.model.Person;
import ro.riscutiatudor.core.model.projection.PersonSummary;

/**
 * Repository to manage {@link Person} instances.
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@RepositoryRestResource(path = "persons", excerptProjection = PersonSummary.class)
public interface PersonRepository extends JpaRepository<Person, Long> {

    /**
     * Search persons by name ignoring case
     * 
     * @param firstName
     * @param lastName
     * @return A {@link List} of {@link Person} instances
     */
    @RestResource(path = "by", exported = true)
    List<Person> findByFirstNameContainingOrLastNameContainingAllIgnoreCase(@Param("name") String firstName,
	    @Param("name") String lastName);

    @Override
    @RestResource(exported = false)
    void delete(Long id);

    @Override
    @RestResource(exported = false)
    void delete(Person entity);

}
