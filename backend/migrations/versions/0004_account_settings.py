"""certificate_name, preferences, tokens_valid_after

Revision ID: 0004
Revises: 0003
Create Date: 2026-10-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("students", sa.Column("certificate_name", sa.String(), nullable=True))
    op.add_column("students", sa.Column("preferences", sa.Text(), nullable=True))
    op.add_column("students", sa.Column("tokens_valid_after", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("students", "tokens_valid_after")
    op.drop_column("students", "preferences")
    op.drop_column("students", "certificate_name")