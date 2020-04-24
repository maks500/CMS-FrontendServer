"use strict";

const defaultSimulationModel = `; simplemodel

(import (rnrs) (emodl cmslib))

(start-model "seir.emodl")

(species S 990)
(species E)
(species I 10)
(species R)

(observe susceptible S)
(observe exposed     E)
(observe infectious  I)
(observe recovered   R)

(param Ki 0.0005)
(param Kl 0.2)
(param Kr (/ 1 7))

(reaction exposure   (S I) (E I) (* Ki S I))
(reaction infection  (E)   (I)   (* Kl E))
(reaction recovery   (I)   (R)   (* Kr I))

(end-model)`;

const defaultConfigText = `{
    "duration" : 365,
    "runs" : 1,
    "samples" : 365,
    "solver" : "R",
    "output" : {
        "headers" : true
    },
    "tau-leaping" : {
        "epsilon" : 0.01
    },
    "r-leaping" : {}
}`;

/** Name of the LocalStorage keys */
const SIMULATION_MODEL_KEY = "simulationModel";
const SIMULATION_CONFIG_KEY = "simulationConfig";

/**
 * Finds the name of declared variables in the model.
 * The declarations must be of the form (param <VAR> <VALUE>), ignoring additional whitespaces
 *
 * TODO: Implement a parser and unparser instead of using Regex.
 */
const VARIABLES_REGEX = new RegExp(/^(?!;).*\(\s*param\s+(\w+)\s+.*\)/, "gm");

const graphLayout = {
  yaxis: { fixedrange: true }, // Dont allow rectangle zooming
  xaxis: {
    title: "Days",
  },
  updatemenus: [
    {
      x: 0,
      y: 0,
      yanchor: "top",
      xanchor: "left",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: { t: 87, r: 10 },
      buttons: [
        {
          method: "animate",
          args: [
            null,
            {
              mode: "next",
              fromcurrent: true,
              transition: { duration: 400, easing: "linear" },
              frame: { duration: 800, redraw: true },
            },
          ],
          label: "▶",
        },
        {
          method: "animate",
          args: [
            [null],
            {
              mode: "next",
              transition: { duration: 0 },
              frame: { duration: 0, redraw: false },
            },
          ],
          label: "||",
        },
      ],
    },
  ],
};
