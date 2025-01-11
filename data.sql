use assalaIskane;
-- Fill 'user' table with all roles
INSERT INTO user (id, nom, prenom, fonction, numero, pass) VALUES
('U001', 'Smith', 'John', 'ChefChantier', '1234567890', 'pass123'),
('U002', 'Doe', 'Jane', 'responsable_comptabiliter', '0987654321', 'pass456'),
('U003', 'Brown', 'Michael', 'responsable_marchandise', '1122334455', 'pass789'),
('U004', 'Taylor', 'Alice', 'responsable_projet', '2233445566', 'pass321'),
('U005', 'Johnson', 'Emily', 'responsable_technique', '3344556677', 'pass654'),
('U006', 'Davis', 'David', 'service_technique', '4455667788', 'pass987');

-- Fill 'projet' table, associating each project with a responsible user
INSERT INTO projet (id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp) VALUES
('P001', 'Project A', 'M001', 'Building a bridge', '2023-01-15', '2023-12-15', 330, 'U001'),
('P002', 'Project B', 'M002', 'Construction of a road', '2023-03-01', '2023-09-01', 184, 'U004');

-- Fill 'chantier' table, associating each chantier with the relevant 'ChefChantier'
INSERT INTO chantier (id_projet, id_resp) VALUES
('P001', 'U001'),
('P002', 'U004');

-- Fill 'ouvrier' table with associations to projects
INSERT INTO ouvrier (id, id_projet, nom, prenom, numero) VALUES
('O001', 'P001', 'Williams', 'David', '1112223334'),
('O002', 'P002', 'Johnson', 'Chris', '5556667778');

-- Fill 'besoin' table with requests for each chantier, validated by relevant users
INSERT INTO besoin (nom, date_demande, qte, valide_par, id_chantier) VALUES
('Cement', '2023-05-01', 50, 'U001', 1),
('Steel', '2023-05-05', 30, 'U004', 2);

-- Fill 'fichier_projet' table with project files
INSERT INTO fichier_projet (nom, fichier, id_projet) VALUES
('Blueprint A', '0xFFD8FFE0', 'P001'),
('Blueprint B', '0xFFD8FFE1', 'P002');

-- Fill 'absence' table for workers associated with projects
INSERT INTO absence (id_ouvrier, date_absence, id_chantier, absent) VALUES
('O001', '2023-06-10', 1, 1),
('O002', '2023-06-12', 2, 1);

-- Fill 'stock' table with different stock entries
INSERT INTO stock (gerant, numero, email) VALUES
('John Doe', '1234567890', 'johndoe@example.com'),
('Jane Smith', '0987654321', 'janesmith@example.com');

-- Fill 'materiel' table with materials linked to stock
INSERT INTO materiel (nom, qte, prix, id_stock) VALUES
('Excavator', 2, 25000.00, 1),
('Crane', 1, 45000.00, 2);

-- Fill 'materiel_chantier' table to link materials with chantiers
INSERT INTO materiel_chantier (id_materiel, id_chantier, qte) VALUES
(1, 1, 1),
(2, 2, 1);

-- Fill 'materiaux' table with different material types in stock
INSERT INTO materiaux (nom, type, qte, prix, id_stock) VALUES
('Cement', 'Building', 100, 1000.00, 1),
('Steel', 'Reinforcement', 50, 5000.00, 2);

-- Fill 'materiaux_chantier' table linking materials to chantiers
INSERT INTO materiaux_chantier (id_materiaux, id_chantier, qte) VALUES
(1, 1, 50),
(2, 2, 25);

-- Fill 'rapport_jour' table with daily reports per chantier
INSERT INTO rapport_jour (id, date_rj, temperature, pluie, vent, remarque, id_chantier) VALUES
(1, '2023-07-01', '30°C', 'No', 'Mild', 'Work progressing well', 1),
(2, '2023-07-02', '28°C', 'Yes', 'Strong', 'Delayed due to rain', 2);

-- Fill 'rj_perso_travaille' table with personnel associated with daily reports
INSERT INTO rj_perso_travaille (id_rj, type, id_ouvrier) VALUES
(1, 'Labor', 'O001'),
(2, 'Foreman', 'O002');

-- Fill 'rj_materiel_sur_chantier' table with material conditions per daily report
INSERT INTO rj_materiel_sur_chantier (materiel, qte, etat, type, id_rj) VALUES
('Excavator', 1, 'Good', 'Heavy', 1),
('Crane', 1, 'Average', 'Heavy', 2);

-- Fill 'rj_travaux_realiser' table with work descriptions per report
INSERT INTO rj_travaux_realiser (id_rj, description) VALUES
(1, 'Foundation work completed'),
(2, 'Steel framework erected');

-- Fill 'photo_rjtr' table with photos of work done per report
INSERT INTO photo_rjtr (id_rj_tr, photo) VALUES
(1, '0xFFD8FFE2'),
(2, '0xFFD8FFE3');

-- Fill 'rj_materiels_materiaux' table with materials used per daily report
INSERT INTO rj_materiels_materiaux (id_rj, designation, unité, qte) VALUES
(1, 'Cement', 'T', 20),
(2, 'Steel', 'T', 15);

-- Fill 'avancement_projet' table to report project progress
INSERT INTO avancement_projet (date_rapport, id_projet) VALUES
('2023-08-01', 'P001'),
('2023-08-15', 'P002');

-- Fill 'ap' table with project tasks
INSERT INTO ap (id_ap, no, nom, duree, debut, fin, etat, avancement) VAuse assalaiskane;
-- Fill 'user' table with random values
INSERT INTO user (id, nom, prenom, fonction, numero, pass) VALUES
('U001', 'Smith', 'John', 'Engineer', '1234567890', 'pass123'),
('U002', 'Doe', 'Jane', 'Manager', '0987654321', 'pass456'),
('U003', 'Brown', 'Michael', 'Supervisor', '1122334455', 'pass789');

-- Fill 'projet' table with random values
INSERT INTO projet (id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp) VALUES
('P001', 'Project A', 'M001', 'Building a bridge', '2023-01-15', '2023-12-15', 330, 'U001'),
('P002', 'Project B', 'M002', 'Construction of a road', '2023-03-01', '2023-09-01', 184, 'U002');

-- Fill 'ouvrier' table with random values
INSERT INTO ouvrier (id, id_projet, nom, prenom, numero) VALUES
('O001', 'P001', 'Williams', 'David', '1112223334'),
('O002', 'P002', 'Johnson', 'Chris', '5556667778');

-- Fill 'chantier' table with random values
INSERT INTO chantier (id_projet, id_resp) VALUES
('P001', 'U001'),
('P002', 'U002');

-- Fill 'besoin' table with random values
INSERT INTO besoin (nom, date_demande, qte, valide_par, id_chantier) VALUES
('Cement', '2023-05-01', 50, 'U001', 1),
('Steel', '2023-05-05', 30, 'U002', 2);

-- Fill 'fichier_projet' table with random values
INSERT INTO fichier_projet (nom, fichier, id_projet) VALUES
('Blueprint A', '0xFFD8FFE0', 'P001'),
('Blueprint B', '0xFFD8FFE1', 'P002');

-- Fill 'absence' table with random values
INSERT INTO absence (id_ouvrier, date_absence, id_chantier, absent) VALUES
('O001', '2023-06-10', 1, 1),
('O002', '2023-06-12', 2, 1);

-- Fill 'stock' table with random values
INSERT INTO stock (gerant, numero, email) VALUES
('John Doe', '1234567890', 'johndoe@example.com'),
('Jane Smith', '0987654321', 'janesmith@example.com');

-- Fill 'materiel' table with random values
INSERT INTO materiel (nom, qte, prix, id_stock) VALUES
('Excavator', 2, 25000.00, 1),
('Crane', 1, 45000.00, 2);

-- Fill 'materiel_chantier' table with random values
INSERT INTO materiel_chantier (id_materiel, id_chantier, qte) VALUES
(1, 1, 1),
(2, 2, 1);

-- Fill 'materiaux' table with random values
INSERT INTO materiaux (nom, type, qte, prix, id_stock) VALUES
('Cement', 'Building', 100, 1000.00, 1),
('Steel', 'Reinforcement', 50, 5000.00, 2);

-- Fill 'materiaux_chantier' table with random values
INSERT INTO materiaux_chantier (id_materiaux, id_chantier, qte) VALUES
(1, 1, 50),
(2, 2, 25);

-- Fill 'rapport_jour' table with random values
INSERT INTO rapport_jour (id, date_rj, temperature, pluie, vent, remarque, id_chantier) VALUES
(1, '2023-07-01', '30°C', 'No', 'Mild', 'Work progressing well', 1),
(2, '2023-07-02', '28°C', 'Yes', 'Strong', 'Delayed due to rain', 2);

-- Fill 'rj_perso_travaille' table with random values
INSERT INTO rj_perso_travaille (id_rj, type, id_ouvrier) VALUES
(1, 'Labor', 'O001'),
(2, 'Foreman', 'O002');

-- Fill 'rj_materiel_sur_chantier' table with random values
INSERT INTO rj_materiel_sur_chantier (materiel, qte, etat, type, id_rj) VALUES
('Excavator', 1, 'Good', 'Heavy', 1),
('Crane', 1, 'Average', 'Heavy', 2);

-- Fill 'rj_travaux_realiser' table with random values
INSERT INTO rj_travaux_realiser (id_rj, description) VALUES
(1, 'Foundation work completed'),
(2, 'Steel framework erected');

-- Fill 'photo_rjtr' table with random values
INSERT INTO photo_rjtr (id_rj_tr, photo) VALUES
(1, '0xFFD8FFE2'),
(2, '0xFFD8FFE3');

-- Fill 'rj_materiels_materiaux' table with random values
INSERT INTO rj_materiels_materiaux (id_rj, designation, unité, qte) VALUES
(1, 'Cement', 'T', 20),
(2, 'Steel', 'T', 15);

-- Fill 'avancement_projet' table with random values
INSERT INTO avancement_projet (date_rapport, id_projet) VALUES
('2023-08-01', 'P001'),
('2023-08-15', 'P002');

-- Fill 'ap' table with random values
INSERT INTO ap (id_ap, no, nom, duree, debut, fin, etat, avancement) VALUES
(1, 1, 'Task A', 10, '2023-07-01', '2023-07-11', 'Completed', '100%'),
(2, 2, 'Task B', 15, '2023-07-12', '2023-07-27', 'In Progress', '60%');