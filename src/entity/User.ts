import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm/index";
import { Field, ID, ObjectType, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID) @PrimaryGeneratedColumn() id: number;

    @Field() @Column() firstName: string;

    @Field() @Column() lastName: string;

    @Field() @Column("text", { unique: true }) email: string;

    @Column() password: string;

    @Field() name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }
}