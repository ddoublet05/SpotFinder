import { pool } from '../db.js';

export const sendInfo = async (req, res) => {
    const { firstname, name, gender } = req.body;

    if (!firstname || !name || !gender) {
        return res.status(400).json({ message: 'Gelieve alle velden in te vullen!'});
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO contact (firstname, name, gender) VALUES (?, ?, ?)',
            [firstname, name, gender]
        );
        res.status(201).json({ id: result.insertId })
    } catch (error) {
        res.status(500).json({ message: 'Fout bij contact opnemen' })
    }
}