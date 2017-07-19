package ro.riscutiatudor.config;

import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

import ro.riscutiatudor.core.model.validator.PersonValidator;

/**
 * Configuration for {@link PersonRepository}
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@Component
public class RestConfig extends RepositoryRestConfigurerAdapter {

	@Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		validatingListener.addValidator("beforeCreate", new PersonValidator());
		validatingListener.addValidator("beforeSave", new PersonValidator());
	}

}
