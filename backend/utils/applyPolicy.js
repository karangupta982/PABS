
import {policies} from './policies.js';

export default function applyPolicy(role) {
  return policies[role] || {};
}


