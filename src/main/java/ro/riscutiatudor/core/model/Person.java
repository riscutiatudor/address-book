package ro.riscutiatudor.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ro.riscutiatudor.util.AbstractAuditableEntity;

/**
 * Person
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@Entity(name = "Person")
@Table(name = "PERSON")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Person extends AbstractAuditableEntity {

	public enum PersonTitle {
		MR, MS
	}

	@Column(name = "TITLE")
	private PersonTitle title;

	@Column(name = "FIRST_NAME")
	private String firstName;

	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "EMAIL_ADDRESS")
	private String emailAddress;

}
