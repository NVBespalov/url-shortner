import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUrlClicksTable1687123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'url_clicks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'urlId',
                        type: 'varchar',
                    },
                    {
                        name: 'ipAddress',
                        type: 'varchar',
                    },
                    {
                        name: 'clickedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'userAgent',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'url_clicks',
            new TableForeignKey({
                columnNames: ['urlId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'urls',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('url_clicks');
    }
}