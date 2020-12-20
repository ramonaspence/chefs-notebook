-- SQLite
UPDATE django_migrations SET app = 'authentication' WHERE app = 'account';

SELECT * FROM django_content_type;

UPDATE django_content_type SET app_label = 'authentication' WHERE app_label = 'account';

ALTER TABLE 'account_emailconfirmation' RENAME TO 'authentication_emailconfirmation';

ALTER TABLE 'account_emailaddress' RENAME TO 'authentication_emailaddress';

ALTER TABLE 'accounts_user' RENAME TO 'authentication_user';

ALTER TABLE 'accounts_user_groups' RENAME TO 'authentication_user_groups';

ALTER TABLE 'accounts_user_user_permissions' RENAME TO 'authentication_user_user_permissions';

UPDATE django_content_type SET app_label = 'authentication' WHERE app_label = 'accounts';

UPDATE django_content_type SET name='<newModelName>' where name='<oldModelName>' AND app_label='<OldAppName>';

DELETE FROM django_migrations WHERE app = 'authentication';

DELETE FROM django_content_types WHERE app = 'authentication';

INSERT INTO django_migrations (id,app,name,applied)
VALUES (25, 'authentication', '0001_initial', '2020-03-06 15:55:50:000000');

ALTER TABLE 'authentication_emailconfirmation' RENAME TO 'account_emailconfirmation';

ALTER TABLE 'authentication_emailaddress' RENAME TO 'account_emailaddress';

ALTER TABLE 'authentication_user' RENAME TO 'accounts_user';

ALTER TABLE 'authentication_user_groups' RENAME TO 'account_user_groups';

ALTER TABLE 'authentication_user_user_permissions' RENAME TO 'account_user_user_permissions';

UPDATE django_content_type SET app_label = 'accounts' WHERE app_label = 'authentication';

UPDATE django_content_type SET app_label = 'account' WHERE id = 9;

UPDATE django_migrations SET app = 'account' WHERE app = 'authentication';