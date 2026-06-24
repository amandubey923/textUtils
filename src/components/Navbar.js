import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaMoon,
  FaSun,
  FaRocket
} from 'react-icons/fa';

export default function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background:
          props.mode === 'dark'
            ? 'rgba(15,23,42,0.75)'
            : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom:
          props.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            color:
              props.mode === 'dark'
                ? '#F8FAFC'
                : '#0F172A',
            fontSize: '1.5rem',
          }}
        >
          <motion.div
            className="d-flex align-items-center gap-2"
            whileHover={{
              scale: 1.05
            }}
          >
            <FaBolt
              style={{
                color: '#8B5CF6'
              }}
            />

            <span className="gradient-text">
              TextPro AI
            </span>
          </motion.div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span
            className="navbar-toggler-icon"
          ></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3"
                to="/"
                style={{
                  color:
                    props.mode === 'dark'
                      ? '#CBD5E1'
                      : '#334155',
                }}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3"
                to="/about"
                style={{
                  color:
                    props.mode === 'dark'
                      ? '#CBD5E1'
                      : '#334155',
                }}
              >
                About
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-3">

            <motion.div
              whileHover={{
                rotate: 15
              }}
            >
              <FaRocket
                style={{
                  color: '#3B82F6'
                }}
              />
            </motion.div>

            {props.mode === 'dark' ? (
              <FaMoon
                size={18}
                color="#8B5CF6"
              />
            ) : (
              <FaSun
                size={18}
                color="#F59E0B"
              />
            )}

            <div className="form-check form-switch m-0">

              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={props.mode === 'dark'}
                onChange={props.toggleMode}
                style={{
                  cursor: 'pointer',
                  transform: 'scale(1.3)',
                }}
              />

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}