package com.mycompany.router.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PARTNER")
@Getter
@Setter
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "ALIAS")
    private String alias;

    @Column(name = "TYPE")
    private String type;

    @Convert(converter = PartnerDirectionConverter.class)
    @Column(name = "DIRECTION")
    private PartnerDirectionEnum direction;

    @Column(name = "APPLICATION")
    private String application;

    @Enumerated(EnumType.STRING)
    @Column(name = "FLOW_TYPE")
    private PartnerFlowTypeEnum flowType;

    @Column(name = "DESCRIPTION")
    private String description;


    @Converter(autoApply = true)
    public static class PartnerDirectionConverter implements AttributeConverter<PartnerDirectionEnum, String> {

        @Override
        public String convertToDatabaseColumn(PartnerDirectionEnum attribute) {
            return (attribute != null) ? String.valueOf(attribute.getCode()) : null;
        }

        @Override
        public PartnerDirectionEnum convertToEntityAttribute(String dbData) {
            return (dbData != null && dbData.length() == 1) ? PartnerDirectionEnum.fromCode(dbData.charAt(0)) : null;
        }
    }


}
