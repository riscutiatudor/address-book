package ro.riscutiatudor.core.model.validator;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import ro.riscutiatudor.core.model.Person;

/**
 * Validator for {@link Person} instances
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
public class PersonValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
	return Person.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
	Person person = (Person) target;
	validateEmailAddress(person.getEmailAddress(), errors);
    }

    /**
     * Validate email address
     * 
     * @param emailAddress
     * @param errors
     */
    public static void validateEmailAddress(String emailAddress, Errors errors) {
	if (emailAddress == null)
	    return;

	try {
	    new InternetAddress(emailAddress).validate();
	} catch (AddressException ex) {
	    Object[] errorArgs = { emailAddress };
	    errors.rejectValue("emailAddress", "person.invalid_emailAddress", errorArgs, emailAddress);
	}
    }

}
