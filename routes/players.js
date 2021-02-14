import express from 'express'
import pool from '../db'

function getPlayersRoutes() {
  const router = express.Router()
  router.get('/players', getPlayers)

  router.post('/players', postPlayers)
  return router
}

async function getPlayers(req, res) {
  try {
    const allPlayers = await pool.query('SELECT * FROM players')
    res.json(allPlayers.rows)
    console.log('SELECT * FROM players')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function postPlayers(req, res) {
  try {
    const {
      player_name,
      age,
      games_played,
      games_started,
      minutes_played,
      field_goals,
      field_goal_attempts,
      field_goal_percent,
      field_goal_three_made,
      field_goal_three_attempts,
      field_goal_three_percent,
      field_goal_two_made,
      field_goal_two_attempts,
      field_goal_two_percent,
      effective_field_goal_percent,
      free_throw_made,
      free_throw_attempts,
      free_throw_percent,
      offensive_rebound,
      defensive_rebound,
      total_rebound,
      assists,
      steals,
      blocks,
      turnovers,
      personal_fouls,
      points,
    } = req.body
    const newPlayer = await pool.query(
      'INSERT INTO players (player_name, age, games_played, games_started, minutes_played, field_goals, field_goal_attempts, field_goal_percent, field_goal_three_made, field_goal_three_attempts, field_goal_three_percent, field_goal_two_made, field_goal_two_attempts, field_goal_two_percent, effective_field_goal_percent, free_throw_made, free_throw_attempts, free_throw_percent, offensive_rebound, defensive_rebound, total_rebound, assists, steals, blocks, turnovers, personal_fouls, points) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *',
      [
        player_name,
        age,
        games_played,
        games_started,
        minutes_played,
        field_goals,
        field_goal_attempts,
        field_goal_percent,
        field_goal_three_made,
        field_goal_three_attempts,
        field_goal_three_percent,
        field_goal_two_made,
        field_goal_two_attempts,
        field_goal_two_percent,
        effective_field_goal_percent,
        free_throw_made,
        free_throw_attempts,
        free_throw_percent,
        offensive_rebound,
        defensive_rebound,
        total_rebound,
        assists,
        steals,
        blocks,
        turnovers,
        personal_fouls,
        points,
      ]
    )
    console.log(
      `INSERT INTO players (player_name, age, games_played, games_started, minutes_played, field_goals, field_goal_attempts, field_goal_percent, field_goal_three_made, field_goal_three_attempts, field_goal_three_percent, field_goal_two_made, field_goal_two_attempts, field_goal_two_percent, effective_field_goal_percent, free_throw_made, free_throw_attempts, free_throw_percent, offensive_rebound, defensive_rebound, total_rebound, assists, steals, blocks, turnovers, personal_fouls, points) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *`
    )
    res.status(201).json(newPlayer.rows[0])
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export { getPlayersRoutes }