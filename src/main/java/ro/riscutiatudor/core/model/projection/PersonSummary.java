package ro.riscutiatudor.core.model.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import ro.riscutiatudor.core.model.Person;

/**
 * Excerpt project for {@link Person} automatically applied on collections
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@Projection(name = "summary", types = Person.class)
public interface PersonSummary {

	Long getId();
	
	@Value("#{target.firstName + ' ' + target.lastName}")
	String getFullName();

}
