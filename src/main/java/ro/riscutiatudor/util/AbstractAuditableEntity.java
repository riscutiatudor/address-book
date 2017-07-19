package ro.riscutiatudor.util;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;

/**
 * Base class for entity implementations. Uses a {@link Long} id.
 *
 * @author Tudor Riscutia
 * @version 1.0
 */
@MappedSuperclass
public abstract class AbstractAuditableEntity {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	private Long id;

	@CreatedDate
	@Column(name = "CREATED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@Getter
	private Date createdDate;

	@LastModifiedDate
	@Column(name = "LAST_MODIFIED_DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@Getter
	private Date lastModifiedDate;

}