"""quiz assessments

Revision ID: 0005
Revises: 0004
"""
from alembic import op
import sqlalchemy as sa

revision = "0005"
down_revision = "0004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "quiz_keys",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("lesson_slug", sa.String(), nullable=False),
        sa.Column("q_index", sa.Integer(), nullable=False),
        sa.Column("correct", sa.Integer(), nullable=False),
        sa.UniqueConstraint("lesson_slug", "q_index", name="uq_quiz_key"),
    )
    op.create_index("ix_quiz_keys_lesson_slug", "quiz_keys", ["lesson_slug"])
    op.create_table(
        "quiz_attempts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("student_id", sa.Integer(), sa.ForeignKey("students.id", ondelete="CASCADE"), nullable=False),
        sa.Column("lesson_slug", sa.String(), nullable=False),
        sa.Column("started_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("finished_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.Column("total", sa.Integer(), nullable=True),
        sa.Column("passed", sa.Boolean(), server_default=sa.false(), nullable=False),
    )
    op.create_index("ix_quiz_attempts_student_id", "quiz_attempts", ["student_id"])


def downgrade() -> None:
    op.drop_table("quiz_attempts")
    op.drop_index("ix_quiz_keys_lesson_slug", table_name="quiz_keys")
    op.drop_table("quiz_keys")