"""add notify_on_reply to students

Revision ID: 0002
Revises: 0001
Create Date: 2026-10-07

"""
from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("students", sa.Column("notify_on_reply", sa.Boolean(), server_default=sa.true(), nullable=False))


def downgrade() -> None:
    op.drop_column("students", "notify_on_reply")