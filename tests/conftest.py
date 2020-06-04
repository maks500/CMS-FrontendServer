import json
import pytest
from pathlib import Path
from ecm import create_app

FIXTURE_DIR = Path(__file__).parent.parent / "fixture"


@pytest.fixture
def simulation_schema():
    def inner(filename):
        data = ""
        with open(FIXTURE_DIR / filename, "r") as f:
            data = json.loads(f.read())
        return data

    return inner


@pytest.fixture
def app():
    return create_app()
